FROM node:latest

RUN npm i -g @angular/cli \
    && npm i -g typescript
	
EXPOSE 4200