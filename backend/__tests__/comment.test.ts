import request = require('supertest');
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

// TODO: add tests for all comment routes