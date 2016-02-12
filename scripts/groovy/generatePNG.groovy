
//how to use it if not argument args[0] to the script
//final workingDirFS = FS.default.getPath('/Users/unrz198/git/rrze-icon-set/monocrom')
def designDirectory = new File('/Users/unrz198/git/rrze-icon-set/bicons')
def dimensionsWithOwnScalable = ['16x16', '22x22']

scalablePath = new File(designDirectory.getPath()+"/scalable")

scalablePath.eachDir () { categoryDirectory ->
    categoryDirectory.eachFile { files ->
        //println files.getPath()
        //println files.metaClass.methods*.name.sort().unique()
        
        //loop for all elements of dimensionsWithOwnScalable
                for ( dimension in dimensionsWithOwnScalable) {
            scaledSVG = new File(designDirectory.getPath()+"/"+ dimension +"/"+ categoryDirectory.getName() +"/"+ files.getName())
            if (!scaledSVG.exists()) {
                println files.getPath()
                println "-> "+ scaledSVG.getPath() +" - muss generiert werden!"
                }
            }
        }
    }



