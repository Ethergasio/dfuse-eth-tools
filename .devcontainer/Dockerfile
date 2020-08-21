ARG VARIANT=focal
FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}

ARG USERNAME=devpod

# Modify the user
RUN groupadd $USERNAME && \
usermod -d /home/$USERNAME -m -g $USERNAME -l $USERNAME vscode

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME