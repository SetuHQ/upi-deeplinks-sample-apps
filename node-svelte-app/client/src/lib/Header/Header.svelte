<script>
  import Icon from "../../assets/icon.svg";
</script>

<header>
  <nav class="navbar flex-nav">
    <div class="nav-left flex-al-center">
      <img alt="nav-logo" class="logo" src={Icon} />
      <a href="/" class="nav-logo"> GoFIN </a>
    </div>
  </nav>
</header>

<style>
  header {
    position: sticky;
    top: 0rem;
    z-index: 100;
  }
  .navbar {
    background-color: var(--clr-white);
    height: 8rem;
    border-bottom: 1px solid var(--clr-grey-15);
    padding: 2rem 3rem;
    box-shadow: var(--lighter-shadow);
  }
  @media only screen and (max-width: 42.375em) {
    .navbar {
      padding: 2rem 1rem;
    }
  }
  .navbar .nav-logo {
    font-size: 2.2rem;
    font-weight: 700;
    margin-left: 1rem;
  }
</style>
