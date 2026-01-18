# VHS documentation
#
# Output:
#   Output <path>.gif               Create a GIF output at the given <path>
#   Output <path>.mp4               Create an MP4 output at the given <path>
#   Output <path>.webm              Create a WebM output at the given <path>
#
# Settings:
#   Set FontSize <number>           Set the font size of the terminal
#   Set FontFamily <string>         Set the font family of the terminal
#   Set Height <number>             Set the height of the terminal
#   Set Width <number>              Set the width of the terminal
#   Set LetterSpacing <float>       Set the font letter spacing (tracking)
#   Set LineHeight <float>          Set the font line height
#   Set Theme <json|string>         Set the theme of the terminal
#   Set Padding <number>            Set the padding of the terminal
#   Set Framerate <number>          Set the framerate of the recording
#   Set PlaybackSpeed <float>       Set the playback speed of the recording
#
# Terminal:
#   Enter                           Press Enter
#   Backspace                       Press Backspace
#   Down                            Press Down arrow
#   Left                            Press Left arrow
#   Right                           Press Right arrow
#   Space                           Press Space
#   Up                              Press Up arrow
#   Tab                             Press Tab
#
# Sleep:
#   Sleep <time>                    Sleep for a set amount of <time> in seconds
#
# Type:
#   Type "string"                   Type a string into the terminal
#   Type@<time> "string"            Type a string into the terminal with <time> delay between each character
#
# Hide:
#   Hide                            Hide the subsequent commands from the output
#
# Show:
#   Show                            Show the subsequent commands in the output

# Output demo.gif
Set FontSize 16
Set Width 1300
Set Height 900
Set Padding 40
Set Theme "Catppuccin Macchiato"
Set WindowBar Colorful
Set BorderRadius 10

Hide
Type "node dist/index.js"
Enter
Show

Sleep 4s
Screenshot demo.png
