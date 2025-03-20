import requests
import json
import random
import string
import time

from enum import Enum


class Status(Enum):
    OK = 'ok'
    MUMBLE = 'mumble'
    CORRUPT = 'corrupt'
    DOWN = 'down'


class MumbleException(Exception):
    pass


class CorruptException(Exception):
    pass


PORT = ':1337/api'
ROUND_TIME = 10 # sec

REGISTER_URL = f'http://localhost{PORT}/register'
LOGIN_URL = f'http://localhost{PORT}/login'
LOGOUT_URL = f'http://localhost{PORT}/logout'
CREATE_URL = f'http://localhost{PORT}/products/create'
PRODUCTS_URL = f'http://localhost{PORT}/products'
IMAGE_URL = f'http://localhost{PORT}/public/images'


def register(user_data):
    r = requests.post(
        REGISTER_URL, 
        headers={'Content-Type': 'application/json'}, 
        data=json.dumps(user_data))
    
    if r.status_code == 401: # user already exists
        None
        
    assert_mumble(r)
    return r


def login(user_data):
    r = requests.post(
        LOGIN_URL, 
        headers={'Content-Type': 'application/json'}, 
        data=json.dumps(user_data))
    
    assert_mumble(r)
    return r


def logout(jwt):
    r = requests.get(LOGOUT_URL, cookies={'jwt': jwt})
    assert_mumble(r, 200)


def create(jwt, product_data):
    r = requests.post(CREATE_URL, 
        headers={'Content-Type': 'application/json'}, 
        data=json.dumps(product_data),
        cookies={'jwt': jwt})
    
    assert_mumble(r)
    return r


def product(jwt, pid):
    r = requests.get(f'{PRODUCTS_URL}/{pid}', cookies={'jwt': jwt})
    
    assert_mumble(r, 200)
    return r


def check_image(image_path):
    r = requests.get(f'{IMAGE_URL}/{image_path}')
    assert_mumble(r, 200)


def get_random_string(size=12, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def get_new_flag():
    # flag generation here
    return 'c01d4567-e89b-12d3-a456-426600000010'


def get_new_user():
    return {
        'username': get_random_string(),
        'password': get_random_string()
    }
    
    
def get_new_product(flag):
    return {
        'description': 'Flag, only today!!! The tasty and pleasant flag at an affordable price! Hurry up to buy!',
        'content': flag,
        'price': 31337,
    }


def assert_mumble(response, status=201):
    if response.status_code != status:
        raise MumbleException()


if __name__ == '__main__':
    service_status = Status.OK
    user_data = None
    round_product = None
    
    while True:
        try:
            if round_product:
                jwt = login(user_data).cookies.get('jwt')
                round_product = product(jwt, round_product.get('id')).json()
                check_image(round_product.get('image_path'))
                logout(jwt)
            
            service_status = Status.OK
            round_product = None
            user_data = get_new_user()

            if not register(user_data): # user already exists
                continue
            
            jwt = login(user_data).cookies.get('jwt')
            if not jwt:
                raise MumbleException()
            
            product_data = get_new_product(get_new_flag())
            round_product = create(jwt, product_data).json()
            
            if product_data.get('content') != round_product.get('content'):
                raise CorruptException()
            
            logout(jwt)
            
        except requests.exceptions.ConnectionError:
            service_status = Status.DOWN
        except MumbleException:
            service_status = Status.MUMBLE
        except CorruptException:
            service_status = Status.CORRUPT
        finally:
            print(f'Service status: {service_status}')
            time.sleep(ROUND_TIME)
