# # Google oauth
# from flask_dance.contrib.google import make_google_blueprint, google

# blueprint = make_google_blueprint(
#     client_id=os.environ.get("GOOGLE_CLIENT_ID"),
#     client_secret=os.environ.get("GOOGLE_CLIENT_SECRET"),
#     redirect_to="google-login"
# )

# app.register_blueprint(blueprint)

# @app.route("/google-login")
# def google_login():
#     if not google.authorized:
#         return redirect(url_for("google.login"))
#     resp = google.get("/oauth2/v2/userinfo")
#     assert resp.ok, resp.text
#     return resp.text