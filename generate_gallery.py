from pathlib import Path
import os

with open("gallery.html", "r+") as f:
    line = ""
    while "<body>" not in line:
        line = f.readline()
    f.readline()
    f.seek(0, os.SEEK_CUR)
    # iterate through filenames in the paintings folder
    painting_file_list = Path("paintings").rglob("*.jpg")
    for painting_fname in painting_file_list:
        print(painting_fname)
        f.write(f"\t<img src=\"{painting_fname}\">\n")
    f.write("\n</body>\n</html>\n")
    