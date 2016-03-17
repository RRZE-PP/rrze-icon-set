
//how to use it if not argument args[0] to the script
//final workingDirFS = FS.default.getPath('/Users/unrz198/git/rrze-icon-set/monocrom')
def designDirectory = new File('/Users/unrz198/git/rrze-icon-set/bicons')
def dimensionsWithOwnScalable = ['16x16', '22x22']
def dimensionsWithoutScalable = ['32x32', '48x48', '72x72', '150x150', '320x320', '720x720']

scalablePath = new File(designDirectory.getPath()+"/scalable")

//check if all directories for all dimensions are existing and if not claim creation
for ( dimension in dimensionsWithoutScalable) {
    dimensionPath = new File(designDirectory.getPath() +"/"+ dimension)
    if (!dimensionPath.exists()) {
        println "-> "+ dimensionPath +" -> directory is missing please create!"
        }
    }

println "=========================="

//check if scalables for small dimension are missing and if so claim generation
scalablePath.eachDir () { categoryDirectory ->
    categoryDirectory.eachFile { files ->
         
        //loop for all elements of dimensionsWithOwnScalable
                for ( dimension in dimensionsWithOwnScalable) {
            scaledSVG = new File(designDirectory.getPath()+"/"+ dimension +"/"+ categoryDirectory.getName() +"/"+ files.getName())
            if (!scaledSVG.exists()) {
                println files.getPath()
                println "-> "+ scaledSVG.getPath() +" -> needs to be generated manually!"
                }
            }
        }
    }



