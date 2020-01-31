import hashlib
import time
import random


def get_cookie(username: str):
    """
    使用sha1加密算法，返回username/当前时间戳/随机数加密后的字符串
    """
    curr_time = str(time.time())
    randint = str(random.randint(10000, 99999))
    random_str = username + randint + curr_time
    s1 = hashlib.sha1()
    s1.update(random_str.encode('utf-8'))
    encrypts = s1.hexdigest()
    return encrypts
