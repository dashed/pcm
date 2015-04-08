FROM hypriot/rpi-iojs:onbuild

RUN npm install pm2 -g

# Expose the ports that your app uses. For example:
EXPOSE 3333
