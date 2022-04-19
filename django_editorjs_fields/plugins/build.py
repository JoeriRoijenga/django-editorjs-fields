import subprocess
import sys

if (len(sys.argv) == 2):
    subprocess.call(['sh', './build.sh', sys.argv[1]])
else:
    subprocess.call(['echo', 'Needs an argument to know which plugin to build'])