FROM devpodio/base:focal-php

WORKDIR $HOME

RUN rm -rf .bashrc
RUN git init && \
  git remote add origin https://github.com/uniibu/dotfiles.git && \
  git fetch && \
  git checkout -t origin/master

RUN rm -rf .git
RUN bash $HOME/bootstrap



