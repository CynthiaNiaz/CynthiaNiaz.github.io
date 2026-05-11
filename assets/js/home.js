/* ============================================
   HOME PAGE JAVASCRIPT
   ============================================ */

// Email link protection
const user = "cynthia.niaz.dev";
const domain = "gmail.com";
const link = document.getElementById("email-link");

if (link) {
    link.href = "mailto:" + user + "@" + domain;
}