import React, { useEffect } from "react";

function FacebookMessengerChat() {
  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v17.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Show dialog after SDK is loaded
    setTimeout(() => {
      if (window.FB) {
        window.FB.CustomerChat.showDialog();
      }
    }, 1000); // Adjust timeout as needed
  }, []);

  return (
    <div className="fixed bottom-16 right-4 z-50">
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="YOUR_PAGE_ID"
        theme_color="#0084FF"
        logged_in_greeting="Hello! How can we assist you?"
        logged_out_greeting="Log in to chat with us!"
      />
    </div>
  );
}

export default FacebookMessengerChat;
