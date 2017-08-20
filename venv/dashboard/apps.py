__author__ = 'Horace'

import os
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
app = Flask(__name__)

app.config.from_object(__name__) # load config from this file , flaskr.py

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'dashboard.db'),
    SECRET_KEY='#@!123$%^654',
    USERNAME='admin',
    PASSWORD='1234',
    SEND_FILE_MAX_AGE_DEFAULT=0,
    TEMPLATES_AUTO_RELOAD=True
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


# @app.teardown_appcontext

@app.route('/')
def main():
    return render_template('layout.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('Welcome to the Hackway!')
            return redirect(url_for('Apparel'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('See you!')
    return redirect(url_for('main'))

def checkLogin():
    if 'logged_in' in session:
        return render_template('user_active_rate.html')
    else:
        return None

@app.route('/apparel/')
def Apparel():
    if 'logged_in' in session:
        return render_template('apparel.html')
    else:
        return redirect(url_for('login'))

@app.route('/consumer_goods/')
def ConsumerGoods():
    if 'logged_in' in session:
        return render_template('consumer_goods.html')
    else:
        return redirect(url_for('login'))



#
# with app.test_request_context():
#     print(url_for('login'))
#     print(url_for('profile', admin_name="xxx"))


# if __name__ == '__main__':
#       app.run(host='127.0.0.1', port=80)
