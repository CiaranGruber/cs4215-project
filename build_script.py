"""Quick Script developed with ChatGPT"""

import os
import re

def search_and_replace(directory_path):
    pattern = r'(import.*"(?!antlr4).*)(";)' # The pattern to search for
    replacement = r'\1.js\2' # The replacement string

    # Loop over all files in the directory (and its subdirectories)
    for dirpath, _, filenames in os.walk(directory_path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)

            # Only process files with the .py extension
            if filepath.endswith('.js') or filepath.endswith('.js.map'):
                with open(filepath, 'r') as f:
                    contents = f.read()

                # Perform the search and replace operation
                new_contents = re.sub(pattern, replacement, contents)

                # If any changes were made, write the updated contents back to the file
                if contents != new_contents:
                    with open(filepath, 'w') as f:
                        f.write(new_contents)

    print('Search and replace operation complete.')

# Example usage:
search_and_replace('./build')