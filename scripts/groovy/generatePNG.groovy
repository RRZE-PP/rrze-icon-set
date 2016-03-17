
//how to use it if not argument args[0] to the script
//final workingDirFS = FS.default.getPath('/Users/unrz198/git/rrze-icon-set/monocrom')
def designDirectory = new File('/Users/unrz198/git/rrze-icon-set/bicons')
def dimensionsWithOwnScalable = ['16x16', '22x22']
def dimensionsWithoutScalable = ['32x32', '48x48', '72x72', '150x150', '720x720']

scalablePath = new File(designDirectory.getPath()+"/scalable")

println "============= Check dimension existence ============="
//check if all directories for all dimensions are existing and if not claim creation
for ( dimension in dimensionsWithoutScalable) {
    dimensionPath = new File(designDirectory.getPath() +"/"+ dimension)
    if (!dimensionPath.exists()) {
        println "-> "+ dimensionPath +" -> directory is missing please create!"
        } else {
            println "All fine!"
            }
    }

println "============ Check category existence =============="

def dimensionsAll = dimensionsWithOwnScalable + dimensionsWithoutScalable

//check if in all dimensions all cetegories are existing and claim generation of missing directories
scalablePath.eachDir () { categoryDirectory ->
    for ( dimension in dimensionsAll) {
        dimensionCategoryDir = new File(designDirectory.getPath()+"/"+ dimension +"/"+ categoryDirectory.getName())
        if (!dimensionCategoryDir.exists()) {
        println "ATTENTION: Plese create "+ dimensionCategoryDir +" -> directory is missing!"
        } else {
            println "All fine!"
            }
        }
    }

println "============ Check small dimension svg existence =============="

//check if scalables for small dimension are missing and if so claim generation
scalablePath.eachDir () { categoryDirectory ->
    categoryDirectory.eachFile { files ->
         
        //loop for all elements of dimensionsWithOwnScalable
                for ( dimension in dimensionsWithOwnScalable) {
                    scaledSVG = new File(designDirectory.getPath()+"/"+ dimension +"/"+ categoryDirectory.getName() +"/"+ files.getName())
                    if (!scaledSVG.exists()) {
                    println "-> "+ scaledSVG.getPath() +" -> needs to be generated manually!"
                    }
                }
            }
        }

println "============ generate missing png =============="

//create pathes for generated png from scalable
scalablePath.eachDir () { categoryDirectory ->
    categoryDirectory.eachFile { files ->
         
        //loop for all elements of dimensionsWithoutScalable
                for ( dimension in dimensionsWithoutScalable) {
                
                    def names = (files.name.split("\\."))
                    def name = names.size() > 1 ? (names - names[-1]).join('.') : names[0]
                                    
                    scaledPNG = new File(designDirectory.getPath()+"/"+ dimension +"/"+ categoryDirectory.getName() +"/"+ name +".png")
                    if (!scaledPNG.exists()) {
                    println "Please generate: -> "+ scaledPNG.getPath() +" !!!"
                    }
                }
            }
        }


