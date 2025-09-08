#!/bin/bash

# function to play a single round
play_round() {
  read -p "Choose rock, paper, or scissors: " choice
  case "$choice" in
    rock|paper|scissors)
      node rps.js "$choice"
      ;;
    *)
      echo "Invalid choice. Please choose rock, paper, or scissors."
      ;;
  esac
}

# main game loop right here
while true; do
  play_round
  read -p "Do you want to play another round? (1 for yes, 0 to quit): " continue_playing
  if [ "$continue_playing" -eq 0 ]; then
    echo "Thanks for playing!"
    break
  fi
done