<template>
  <div class="login">
      <div class="container custom-container">
        <div class="card-panel">
            <div class="card-title center">
                <h4 class="blue-text darken-3">Login</h4>
            </div>
            <form class="">
                <div class="row col-sm-12">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 center.align">
                        <div class="field input-field">
                            <input type="email" name="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="field input-field">
                            <input type="password" name="password">
                            <label for="password">Password:</label>
                        </div>
                        <div class="center">
                            <a class="waves-effect waves-light btn blue darken-3 white-text">Login</a><br><br>
                            <a class="flat">Forgot password</a>
                        </div>
                    </div>
                    <div class="col-sm-4"></div>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.login .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 65vw;
}
.col-sm-4{
    width: 33%;
}
</style>