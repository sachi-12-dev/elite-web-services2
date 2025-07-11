from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'replace-with-your-secret-key'

db = SQLAlchemy(app)

# ----------- Models -----------
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    excerpt = db.Column(db.String(300), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Post {self.id} - {self.title}>'

# ----------- Routes -----------
@app.route('/')
def home():
    return redirect(url_for('blog'))

@app.route('/blog')
def blog():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template('blog.html', posts=posts)

@app.route('/blog/<int:post_id>')
def view_post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if request.method == 'POST':
        title = request.form['title']
        excerpt = request.form['excerpt']
        content = request.form['content']
        if not title or not excerpt or not content:
            flash('All fields are required.', 'error')
            return redirect(url_for('admin'))
        new_post = Post(title=title, excerpt=excerpt, content=content)
        db.session.add(new_post)
        db.session.commit()
        flash('Blog post created!', 'success')
        return redirect(url_for('blog'))

    posts = Post.query.order_by(Post.created_at.desc()).all()
    return render_template('admin.html', posts=posts)

# ----------- Initialization -----------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
