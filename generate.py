from __future__ import print_function
from six.moves import cPickle
from six import text_type
import tensorflow as tf
from model import Model
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

class dotdict(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__

def parseCharArray(charArray):
    r = []
    string = ''
    for char in charArray:
        if char != '\n':
            string += char
        else:
            r.append(string)
            string = ''
    return r

host_url = 'http://127.0.0.1:8000/'
model_dir = os.path.curdir + '/model/'
sketch_path = './p5template/sketch.js'

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1024x800")

args = dotdict({'n': 30, 'save_dir': os.path.curdir +
                '/model/', 'prime': 'var ', 'sample': 1})

round = 1

chrome_driver_path = os.path.join(os.getcwd(), "chromedriver")
driver = webdriver.Chrome(options=chrome_options,
                          executable_path=chrome_driver_path)

driver.get(host_url)

def getJSError():
    r = False
    driver.refresh();
    body = driver.find_element_by_tag_name("body")
    print('checking error')
    if body.get_attribute("jserror") == 'true':
        r = True
        print('find error')
    else:
        print('you re good')
    # driver.close()
    return r

def generate(num):
    global round
    newLines = parseCharArray(model.sample(sess, chars, vocab, num, args.prime,
                                           args.sample))
    content.extend(newLines)
    print('generating, try: ', round)
    round += 1

    file = open(sketch_path, "w")
    file.write("\n".join(content))
    file.close()


def removeOne():
    with open(sketch_path) as sketch:
        content = sketch.read().splitlines()

    if len(content) > 0:
        print('deleting 1')
        content.pop()
    else:
        print('already emplty')
    file = open(sketch_path, "w")
    file.write("\n".join(content))
    file.close()


# generate 10000 chars, then append each line
# if first line works, append line 2 - 5
# if not work, delete until it works
# remember deleted how many lines
# skip the last line apend last + 1

generation = []

startingLine = 0
num_lines_per_adding = 5

sketch = []

if e:
    sketch.pop()
    startingLine -= 1
else:
    listToAdd = generation[startingLine : startingLine + num_lines_per_adding]
    startingLine += num_lines_per_adding
    sketch.append(listToAdd)


# add 1,2,3,4,5,
# remove 5,4,3
# so  line 1, 2 works
# skip 3
# append 4,5,6,7,8
# remove 8,7,6,5,4
# none works
# skip 4

with open(sketch_path) as sketch:
    content = sketch.read().splitlines()
with open(os.path.join(model_dir, 'config.pkl'), 'rb') as f:
    saved_args = cPickle.load(f)
with open(os.path.join(model_dir, 'chars_vocab.pkl'), 'rb') as f:
    chars, vocab = cPickle.load(f)
# Use most frequent char if no prime is given
if args.prime == '':
    args.prime = chars[0]
model = Model(saved_args, training=False)
with tf.Session() as sess:
    tf.global_variables_initializer().run()
    saver = tf.train.Saver(tf.global_variables())
    ckpt = tf.train.get_checkpoint_state(args.save_dir)
    if ckpt and ckpt.model_checkpoint_path:
        saver.restore(sess, ckpt.model_checkpoint_path)
        while True:
            error = getJSError()
            if error:
                removeOne()
            else:
                generate(10000)

print('finished')
