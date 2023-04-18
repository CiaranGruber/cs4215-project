from pathlib import Path
import argparse
import re


def search_and_replace(directory_path: Path, pattern: re.Pattern, replace_string: str, file_pattern: re.Pattern):
    """Replaces all strings matching a set pattern

    :param directory_path: The path to iterate over
    :param pattern: The pattern to match
    :param replace_string: The string used to replace the pattern groups
    :param file_pattern: The pattern used to match files
    :return:
    """
    # Loop over all files in the directory (and its subdirectories)
    for directory in directory_path.iterdir():
        if directory.is_dir():
            search_and_replace(directory, pattern, replace_string, file_pattern)
        elif directory.is_file() and re.match(file_pattern, str(directory)):
            with open(directory, 'r') as f:
                contents = f.read()

            # Perform the search and replace operation
            new_contents = re.sub(pattern, replace_string, contents)

            # If any changes were made, write the updated contents back to the file
            if contents != new_contents:
                with open(directory, 'w') as f:
                    f.write(new_contents)


def main():
    # Parse arguments
    arg_parser = argparse.ArgumentParser(description="Replaces the strings within a set of files")
    arg_parser.add_argument("-p", "--pattern", metavar="pattern", type=str, required=True,
                            help="The pattern to recognise the string")
    arg_parser.add_argument("-r", "--replace", metavar="replace", type=str, required=True,
                            help="The pattern used to replace any matched strings")
    arg_parser.add_argument("-d", "--directory", metavar="directory", type=Path,
                            help="The base directory to search")
    arg_parser.add_argument("-f", "--file_pattern", metavar="file_pattern", type=str,
                            help="The pattern used to match files")
    args = arg_parser.parse_args()

    # Apply options
    pattern = re.compile(args.pattern)
    replace_string = args.replace
    directory = "." if args.directory is None else args.directory
    file_pattern = re.compile(".") if args.file_pattern is None else re.compile(args.file_pattern)

    # Run program
    print("Attempting to modify files under the directory '{}'".format(directory.absolute()))
    search_and_replace(directory, pattern, replace_string, file_pattern)
    print('Search and replace operation complete.')


if __name__ == "__main__":
    main()
