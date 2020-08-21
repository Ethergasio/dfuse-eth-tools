ARG VARIANT=focal
FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}

ARG USERNAME=devpod

# Modify the user
RUN groupadd $USERNAME && \
usermod -d /home/$USERNAME -m -g $USERNAME -l $USERNAME vscode && \
echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME && rm -rf /etc/sudoers.d/vscode

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME