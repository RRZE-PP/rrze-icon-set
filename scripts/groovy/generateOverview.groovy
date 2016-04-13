def designDirectory = new File('/Users/unrz198/git/rrze-icon-set/monocrom')

def overviewIconsDimensionDir = new File(designDirectory.getPath()+ File.separator + "48x48")

overviewIconsDimensionDir.eachDir () { categoryDirectory ->
    categoryDirectory.eachFile { file ->
        if (file.toURL().openConnection().getContentType() == "image/png") {
            //here is JAVA magic needed
            }
        }
    }
