# sampeller.com

Sam Peller's portfolio, hosted on GitHub Pages (the custom domain is set in `CNAME`).
It's plain HTML, CSS, and a little JavaScript with no build step: edit a file, commit it,
and GitHub Pages publishes the change.

## Pages

| File | What's on it |
| --- | --- |
| `index.html` | Home: intro and ID badge, certifications, selected projects, business, experience, contact |
| `school.html` | All projects, grouped (the file name is kept so links on the resume and LinkedIn still work) |
| `business.html` | BOFA LLC and its games |
| `about.html` | Background, certifications and training, experience, education, tools |
| `404.html` | Shown by GitHub Pages for any missing page |

## Common edits

- **Add a Credly verification link to a certification.** In `index.html` and `about.html`,
  search for `Credly`. Each certification has a commented-out "Verify on Credly" link; paste
  your badge URL into it and remove the `<!--` and `-->` around it.
- **Add a project.** Copy one `<article class="project">` block in `school.html`, then change
  the screenshot, text, and report link. To feature it on the home page, copy an
  `<article class="work">` block in `index.html`.
- **Change colors.** All colors are tokens at the top of `css/style.css` (light theme first,
  then dark).
- **Replace the resume.** Overwrite `assets/resume.pdf`; every "Resume" button points to it.

## Fonts

Atkinson Hyperlegible Next and Atkinson Hyperlegible Mono are self-hosted in `fonts/`
under the SIL Open Font License (`fonts/OFL.txt`), so the site never calls Google Fonts
or any other third party.

## Security policy

Every page has a `Content-Security-Policy` meta tag that only allows files from this
domain. If you add an outside script or embed later (analytics, a badge widget, a video),
add its domain to the matching directive in each page's `<head>`, or the browser will block it.
