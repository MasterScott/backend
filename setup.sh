#!/bin/bash

# Add Psql Source
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt trusty-pgdg main" >> /etc/apt/sources.list'

# Get Keys
wget --quiet -O - http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update

# Install postgres

sudo apt-get install postgresql-9.4-postgis-2.1 pgadmin3 postgresql postgresql-contrib postgresql-9.3-postgis-scripts 
sudo -u postgres createuser --superuser $USER
sudo -u postgres createdb $USER
sudo -u postgres createdb columbus
