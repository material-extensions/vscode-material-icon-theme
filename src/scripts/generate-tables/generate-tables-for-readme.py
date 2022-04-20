from os import listdir
from os.path import isfile, join
import string

# Location of icons from current directory
path_for_icons = '../../../icons/'
# Location of raw icons
path_for_raw_icons = 'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/'

# Alphabet and numbers list
alphabet_list = list(string.ascii_lowercase)
numbers_list = list(range(0,10))
alphabet_list = numbers_list + alphabet_list

# Dictionaries for alphabet
# dict_for_file_icons = dict.fromkeys(string.ascii_lowercase, [])
# dict_for_folder_icons = dict.fromkeys(string.ascii_lowercase, [])
dict_for_file_icons = dict.fromkeys(alphabet_list, [])
dict_for_folder_icons = dict.fromkeys(alphabet_list, [])


def generate_tables():
    # Get all file names
    all_files = [f for f in listdir(path_for_icons) if isfile(join(path_for_icons, f))]
    
    # Add file names to separate lists
    file_icons = []
    folder_icons = []

    for file_name in all_files:
        if file_name.startswith("folder-"):
            folder_icons.append(file_name.split('folder-')[1])
        else:
            file_icons.append(file_name)

    # Sort lists alphabetically
    file_icons = sorted(file_icons)
    folder_icons = sorted(folder_icons)

    # Add filenames to dictionary
    for key, value in dict_for_file_icons.items():
        temp = []
        for name in file_icons:
            if name.startswith(str(key)):
                temp.append(name)
        dict_for_file_icons[key] = temp

    for key, value in dict_for_folder_icons.items():
        temp = []
        for name in folder_icons:
            if name.startswith(str(key)):
                temp.append(name)
        dict_for_folder_icons[key] = temp

    # Remove empty values from dictionary
    for key, value in dict_for_file_icons.copy().items():
        if len(value) == 0:
            dict_for_file_icons.pop(key, None)

    for key, value in dict_for_folder_icons.copy().items():
        if len(value) == 0:
            dict_for_folder_icons.pop(key, None)

    # Create file with table for file icons
    with open('icons_file.txt','w') as file:
        for key, value in dict_for_file_icons.items():
            if key in range(0,10): # Tables for icon names beginning with numbers
                if len(value) < 5: # Table columns should not exceed length of 5 icons + names
                    file.write(f'#### {key}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, len(value)):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    file.write(f'<tr>\n')
                    for file_name in value:
                        file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                        file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                    file.write(f'</tr>\n')
                    file.write(f'</table>\n\n')
                else:
                    file.write(f'#### {key}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, 5):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    for file_name in value:
                        if value.index(file_name) % 5 == 0: # Start of new row
                            file.write(f'<tr>\n')
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                        elif value.index(file_name) % 5 == 4: # End of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                            file.write(f'</tr>\n')
                        else: # Continuation of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                    file.write(f'</table>\n\n')
            else: # Tables for icon names beginning with letter
                if len(value) < 5: # Table columns should not exceed length of 5 icons + names
                    file.write(f'#### {key.upper()}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, len(value)):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    file.write(f'<tr>\n')
                    for file_name in value:
                        file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                        file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                    file.write(f'</tr>\n')
                    file.write(f'</table>\n\n')
                else:
                    file.write(f'#### {key.upper()}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, 5):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    for file_name in value:
                        if value.index(file_name) % 5 == 0: # Start of new row
                            file.write(f'<tr>\n')
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                        elif value.index(file_name) % 5 == 4: # End of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                            file.write(f'</tr>\n')
                        else: # Continuation of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                    file.write(f'</table>\n\n')
    file.close()

    # Create file with table for folder icons
    with open('folders_file.txt','w') as file:
        for key, value in dict_for_folder_icons.items():
            if key in range(0,10): # Tables for icon names beginning with numbers
                if len(value) < 4: # Table columns should not exceed length of 4 icons + names
                    file.write(f'#### {key}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, len(value)):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    file.write(f'<tr>\n')
                    for file_name in value:
                        file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}folder-{file_name}"/></td>\n')
                        file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                    file.write(f'</tr>\n')
                    file.write(f'</table>\n\n')
                else:
                    file.write(f'#### {key}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, 4):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    for file_name in value:
                        if value.index(file_name) % 5 == 0: # Start of new row
                            file.write(f'<tr>\n')
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                        elif value.index(file_name) % 5 == 4: # End of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                            file.write(f'</tr>\n')
                        else: # Continuation of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0]}</td>\n')
                    file.write(f'</table>\n\n')
            else: # Tables for icon names beginning with letter
                if len(value) < 5: # Table columns should not exceed length of 4 icons + names
                    file.write(f'#### {key.upper()}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, len(value)):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    file.write(f'<tr>\n')
                    for file_name in value:
                        file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}folder-{file_name}"/></td>\n')
                        file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                    file.write(f'</tr>\n')
                    file.write(f'</table>\n\n')
                else:
                    file.write(f'#### {key.upper()}\n')
                    file.write(f'<table>\n')
                    file.write(f'<tr>\n')
                    for _ in range(0, 5):
                        file.write(f'<th>Icon</th>\n')
                        file.write(f'<th>Name</th>\n')
                    file.write(f'</tr>\n')
                    for file_name in value:
                        if value.index(file_name) % 5 == 0: # Start of new row
                            file.write(f'<tr>\n')
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}folder-{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                        elif value.index(file_name) % 5 == 4: # End of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}folder-{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                            file.write(f'</tr>\n')
                        else: # Continuation of existing row
                            file.write(f'<td><img width=25px; height=25px src="{path_for_raw_icons}folder-{file_name}"/></td>\n')
                            file.write(f'<td>{file_name.split(".svg")[0].capitalize()}</td>\n')
                    file.write(f'</table>\n\n')
    file.close()

if __name__ == '__main__':
    generate_tables()
