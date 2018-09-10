
<template>
    <footer class="md-caption">
      <p>
        ⛩ 100% free Japanese Phrasebook app, built for travel and offline usage.
        Add it to your Home screen and access 670+ essential phrases in 19 topics.
        Requires no Internet connection and offers speech synthesis,
        so you know how to pronounce Japanese phrases correctly.
      </p>

      <ul class="share-buttons">
        <li>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Share on Facebook" target="_blank" rel="noopener">
            <img alt="Share on Facebook" src="../assets/sharing/Facebook.png"/>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fwww.japanese-phrasebook.com&text=https%3A%2F%2Fwww.japanese-phrasebook.com%2F&via=manuelwieser"
             title="Tweet" target="_blank" rel="noopener">
            <img alt="Tweet" src="../assets/sharing/Twitter.png"/>
          </a>
        </li>
        <li>
          <a href="https://plus.google.com/share?url=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Share on Google+" target="_blank" rel="noopener">
            <img alt="Share on Google+" src="../assets/sharing/Google+.png"/>
          </a>
        </li>
        <li>
          <a href="http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Post to Tumblr" target="_blank" rel="noopener">
            <img alt="Post to Tumblr" src="../assets/sharing/Tumblr.png"/>
          </a>
        </li>
        <li>
          <a href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Pin it" target="_blank" rel="noopener">
            <img alt="Pin it" src="../assets/sharing/Pinterest.png"/>
          </a>
        </li>
        <li>
          <a href="http://www.reddit.com/submit?url=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Submit to Reddit" target="_blank" rel="noopener">
            <img alt="Submit to Reddit" src="../assets/sharing/Reddit.png"/>
        </a>
        </li>
        <li>
          <a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.japanese-phrasebook.com&source=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Share on LinkedIn" target="_blank" rel="noopener">
            <img alt="Share on LinkedIn" src="../assets/sharing/LinkedIn.png"/>
          </a>
        </li>
        <li>
          <a href="mailto:?subject=&body=https%3A%2F%2Fwww.japanese-phrasebook.com"
             title="Send email" target="_blank" rel="noopener">
            <img alt="Send email" src="../assets/sharing/Email.png"/>
          </a>
        </li>
      </ul>

      <p>Developed with ❤️ by Manuel Wieser</p>

      <p>
        <a href="https://twitter.com/manuelwieser" target="_blank" rel="noopener">@manuelwieser</a> |
        <a href="https://manu.ninja" target="_blank" rel="noopener">manu.ninja</a>
      </p>

      <p>
        <a href="https://www.paypal.me/manuninja" target="_blank" rel="noopener">
          <img src="../assets/paypal.svg" alt="Donate">
        </a>
      </p>

      <p>
        Logo by <a href="https://steemit.com/@happyksu" target="_blank" rel="noopener">Ksenia</a> |
        Pictures by <a href="https://www.instagram.com/daisimerollin/" target="_blank" rel="noopener">Daisy</a>
      </p>

      <p>
        Data from <a href="https://wikitravel.org/en/Japanese_phrasebook" target="_blank" rel="noopener">Wikitravel</a>
      </p>

      <p>© {{ (new Date()).getFullYear() }} Manuel Wieser</p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
  footer {
    margin: 2em 0;
    text-align: center;
  }

  ul.share-buttons{
    list-style: none;
    padding: 0;
  }

  ul.share-buttons li{
    display: inline;
  }

  ul.share-buttons .sr-only{
    position: absolute;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
</style>
