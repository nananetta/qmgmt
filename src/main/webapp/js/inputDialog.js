<script type="text/ng-template" id="dialog.tmpl.html">
<md-dialog aria-label="Mango (Fruit)">
  <form ng-cloak>
    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>Mango (Fruit)</h2>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="cancel()">
          <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <md-dialog-content>
      <div class="md-dialog-content">
        <h2>Using .md-dialog-content class that sets the padding as the spec</h2>
        
        <p>
          It originated in Indian subcontinent (present day India and Pakistan) and Burma. It is the national fruit of, public celebrations, and religious ceremonies.
        </p>
      </div>
    </md-dialog-content>

    <md-dialog-actions layout="row">
      
      <span flex></span>
      <md-button ng-click="answer('not useful')">
       Not Useful
      </md-button>
      <md-button ng-click="answer('useful')">
        Useful
      </md-button>
    </md-dialog-actions>
  </form>
</md-dialog>
</script>