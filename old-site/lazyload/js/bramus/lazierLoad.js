/*****************************************************************
 *
 * lazierLoad 0.4 - by Bramus! - http://www.bram.us/
 * inspired upon http://www.appelsiini.net/projects/lazyload/
 *
 * v 0.4 - 2008.02.28 - added ability to automatically autoLoad or not
 *                    - backdrop from 0.2 where one could set options through a new instantiation, enabling one to have per page options
 * v 0.3 - 2008.02.26 - added options: minWidth, minHeight, imgTypes
 *                    - moved all options to global Object
 *                    - Works with latest Prototype (1.6.0.2)
 * v 0.2 - 2007.09.12 - added options: treshold, replaceImage, loadingImage
 * v 0.1 - 2007.09.11 - initial release
 *
 * Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
 *
 *****************************************************************/
 
 
  /**
  * CONFIG - CHANGE THESE IF YOU LIKE
  * -------------------------------------------------------------
  */
		
 	// Should lazierLoad hook itself to the page? - default : true
		var lazierLoadAutoHook	= true;		

	// lazierLoad default options
		var lazierLoadDefaultOptions = {
			
			treshold		: 100,							// Offset from bottom to start preloading
			extensions		: ['gif','png','jpg','jpeg'],	// Array of extensions to lazyLoad
			
			replaceImage	: "blank.gif",					// Placeholder image to show instead of the image (best leave unchanged to this blank.gif!)
			loadingImage	: "spinner.gif",				// Loading indicator
			
			minWidth		: 16,							// Minimum width of an image to lazyLoad
			minHeight		: 16							// Minimum height of an image to lazyLoad
		}
		
		
 /**
  * NO NEED TO CHANGE ANYTHING BENEATH THIS LINE
  * -------------------------------------------------------------
  */
 
 
	/**
	 * JS_BRAMUS Object
	 * -------------------------------------------------------------
	 */
	 
		if (!JS_BRAMUS) { var JS_BRAMUS = new Object(); }
		
		
	/**
	 * lazierLoad Class
	 * -------------------------------------------------------------
	 */

		JS_BRAMUS.lazierLoad 				= Class.create();
		JS_BRAMUS.lazierLoad.prototype 		= {
			
			initialize			: function(options) {				
				// find all images and lazyLoad 'm				
				$$('img').each(function(image) {
					new JS_BRAMUS.lazierLoadImage(image, options);  
				});
			}		
			
		}
		
		
	/**
	 * lazierLoadImage Class
	 * -------------------------------------------------------------
	 */


		JS_BRAMUS.lazierLoadImage 				= Class.create();
		JS_BRAMUS.lazierLoadImage.prototype 	= {
			
			options				: null,			// options
			
			element				: null,			// the img element
			loading				: false,		// loading
			loaded				: false,		// loaded
			position			: null,			// element's position
			viewportHeight		: 0,			// height of the viewport
			lazyScroller		: null,			// cached bounds function - see http://www.prototypejs.org/api/event/stopObserving
		
			initialize			: function(image, options) {
						
				// set the options
				this.options				= Object.clone(lazierLoadDefaultOptions);
				Object.extend(this.options, options || {});
			
				// calculate position of image
				this.element				= image;
				this.position				= Position.page(this.element);
				this.viewportHeight			= document.viewport.getHeight();
				
				// image "above the fold" already
				if (this.position[1] < (this.viewportHeight + this.options.treshold)) {
								
					this.loading	= true;
					this.loaded		= true;
				
				// image not "above the fold"
				} else {
					
					// get original source element (for further reference), the filename and the extension.
					this.element.origSrc 	= this.element.src;
					this.element.fileName 	= this.element.origSrc.substring(this.element.origSrc.lastIndexOf('/')+1,this.element.origSrc.length);
					this.element.fileType 	= this.element.fileName.substring(this.element.fileName.lastIndexOf('.')+1, this.element.fileName.length);
					
					// extension not in array; no need to lazyload
					if (this.options.extensions.indexOf(this.element.fileType) == -1) {					
						return;	
					}
					
					// image not large enough
					if ((this.element.width <= parseInt(this.options.minWidth)) && (this.element.height <= parseInt(this.options.minHeight))) {						
						return;	
					}
					
					// set blank and loading image
					this.element.src 		= this.options.replaceImage;
					this.element.setStyle({ backgroundImage: 'url(' + this.options.loadingImage + ')', backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat' });
			
					// observe the page scroll event	
					this.lazyScroller 		= this.lazyScroll.bindAsEventListener(this);
					Event.observe(window, 'scroll', this.lazyScroller.bind(this), false);	
				}
			},
			
			lazyScroll			: function() {
									
				// image not loaded and not loading
				if ((this.loaded == false) && (this.loading != true)) {
				
					// image "above the fold" ?
					if ((document.viewport.getScrollOffsets()[1] + document.viewport.getHeight() + parseInt(this.options.treshold)) > this.position[1]) {
	
						this.loading	= true;
						
						// load in the new image
						var newImage 	= null;
						newImage 		= new Image();
						newImage.src 	= this.element.origSrc;
	
						// image is in cache (IE6 & IE7 ... Firefox can handle the onload well even file was in cache);
						if (newImage.complete) {
								this.element.src 	= newImage.src;
								this.loaded			= true;
								
						// image not in cache
						} else {
							newImage.onload = function() {
								this.element.src 	= newImage.src;
								this.loaded			= true;
							}.bind(this);
						}
	
						// stop the observer
						Event.stopObserving(window, 'scroll', this.lazyScroller);
					}
				}
				
			}
		}
		
		
	/**
	 * Hook lazierLoad to the dom:loaded event
	 * -------------------------------------------------------------
	 */
	 
	 	if (lazierLoadAutoHook == true) {
			function initLazierLoad() { myLL = new JS_BRAMUS.lazierLoad(); }
			Event.observe(document, 'dom:loaded', initLazierLoad, false);
		}
		
