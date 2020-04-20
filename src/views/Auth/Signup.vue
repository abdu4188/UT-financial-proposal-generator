<template>
  <div class="signup">
      <div class="container custom-container">
        <div class="card-panel">
            <div class="card-title center">
                <h4 class="blue-text darken-3">Signup</h4>
            </div>
            <form class="">
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 center.align">
                        <div class="field input-field">
                            <input type="text" name="fname">
                            <label for="fname">First name</label>
                        </div>
                        <div class="field input-field">
                            <input type="text" name="lname">
                            <label for="lname">Last name</label>
                        </div>
                        <div class="field input-field">
                            <input type="email" name="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="field input-field">
                            <input type="password" name="password">
                            <label for="password">Password:</label>
                        </div>
                        <div class="field input-field">
                            <input type="password" name="repass">
                            <label for="repass">Enter your password again</label>
                        </div>
                        <div class="center">
                            <a class="waves-effect waves-light btn blue darken-3 white-text">signup</a>
                        </div>
                    </div>
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
.signup .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 60vw;
}
</style>