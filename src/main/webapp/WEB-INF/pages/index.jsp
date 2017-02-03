<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="context" value="${pageContext.request.contextPath}" />
<html>
<head>
<script type="text/javascript" src="${context}/resources/scripts/angular-min-1.5.5.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular-animate.min-1.5.5.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular-route.min-1.5.5.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular-aria.min-1.5.5.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular-messages.min-1.5.5.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/svg-assets-cache-114.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular-material-v1.1.1.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/ng-table.min.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/angular_ngreource.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/loading-bar.min.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/jquery.min.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/app.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/sessionctrl.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/qmanagerctrl.js"></script>
<script type="text/javascript" src="${context}/resources/scripts/qviewerctrl.js"></script>

<link rel="stylesheet" href="${context}/resources/styles/angular-material-v1.1.1.css" />
<link rel="stylesheet" href="${context}/resources/styles/ng-table.min.css" />
<link rel="stylesheet" href="${context}/resources/styles/bootstrap.min.css" />
<link rel="stylesheet" href="${context}/resources/styles/docs-1.1.1.css" />
<link rel="stylesheet" href="${context}/resources/styles/app.css" />
<link rel="stylesheet" href="${context}/resources/styles/loading-bar.min.css" />

</head>
<body>
	<div ng-cloak="" ng-app="MyApp">
		<md-content> 
			<md-toolbar class="md-hue-2" ng-controller="SessionCtrl as sess" >
			<div class="md-toolbar-tools">
				<img src="${context}/resources/img/mwa-logo.jpg" height="50">
				<h2>
					<span>ระบบจัดการคิวบริการหาท่อรั่ว</span>
				</h2>
				<span flex=""></span>
				<div id="logout-div">
					<span class="loginAs">ชื่อผู้ใช้: {{sess.userName}}</span>
					<md-button class="md-raised" ng-href="${context}/logout">ออกจากระบบ</md-button>
				</div>
			</div>
			</md-toolbar> 
		</md-content>
						
		<md-content id="qmgr-div" class="md-padding" layout="row" ng-controller="QManagerCtrl as qmgr" >
						<script type="text/ng-template" id="inputDialog.tmpl.html">
<md-dialog>

<md-content class="md-padding" layout="row">
					<md-whiteframe class="md-whiteframe-2dp" class="md-padding" flex="">
						<md-toolbar md-scroll-shrink ng-if="true">
							<div class="md-toolbar-tools">
								<h3>
									<span>จ่ายคิว</span>
								</h3>
        <span flex></span>
        <md-button class="md-icon-button" ng-click="dc.cancel()">
          <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>
        </md-button>
							</div>
						</md-toolbar>
<md-dialog-content>
							<form name="userForm">
								<p></p>
								<div layout-gt-sm="row">
									<md-input-container class="md-block">
										<label>เลขทะเบียนผู้ใช้น้ำ</label>
										<input ng-model="dc.accountNo">
									</md-input-container>
									<md-input-container class="md-block">
										<label>เลขที่คำร้อง</label> 
										<input ng-model="dc.petitionNo">
									</md-input-container>
								</div>
								<div layout-gt-sm="row">
									<md-input-container class="md-block">
										<label>ช่วงเวลาที่นัด</label> 
										<input ng-model="dc.reservedWeekText" class="dialogTextInput" disabled>
									</md-input-container>
								</div>
								<div layout-gt-sm="row">
									<md-input-container class="md-block">
										<label>สาขา</label> 
										<input ng-model="dc.branchText" class="dialogTextInput" disabled>
									</md-input-container>
								</div>
							</form>
    </md-dialog-content>
    <md-dialog-actions layout="row">
      <span flex></span>
      <md-button class="md-raised md-primary" ng-click="dc.answer('save')">บันทึก</md-button>
      <md-button ng-click="dc.cancel()">
       ยกเลิก
      </md-button>
    </md-dialog-actions>
					</whiteframe>
					</md-content>

</md-dialog>
</script>
			<md-whiteframe class="md-whiteframe-2dp" class="md-padding" flex="">
				<md-toolbar md-scroll-shrink ng-if="true">
					<div class="md-toolbar-tools">
						<h3>
							<span>จัดการคิว</span>
						</h3>
					</div>
				</md-toolbar>
				<div layout="row">
					<div class="form-group">
						<md-input-container>
							<label>สาขา</label>
							<md-select ng-model="qmgr.branchId" ng-change="qmgr.selectBranch()">
								<md-option ng-repeat="branch in qmgr.branches" value="{{branch.id}}">
									{{branch.code}} - {{branch.description}} </md-option>
							</md-select>
						</md-input-container>
					</div>
				</div>
				<div layout="row" layout-xs="column">
					<ul>
					<li ng-repeat="card in qmgr.result" >
					<md-card>
						<md-card-title>
						  <md-card-title-text>
						    <span class="md-headline">{{card.weekText}}</span>
						    <span class="md-subhead">{{card.branchText}}</span>
						  </md-card-title-text>
						 <span class="md-media-sm card-media">{{card.status}}</span>
						</md-card-title>
						<md-card-actions layout="row" layout-align="end center">
			    			<md-button class="md-raised" ng-click="qmgr.showInputDialog($event, card.branchId, card.weekId, card.weekText)">จองคิว</md-button>
						</md-card-actions>
					</md-card>
					</li>
					</ul>
			    </div>
			    <div layout="row" id="viewmore" ng-if="qmgr.isBranchSelected == true">
					<md-button id="viewmore-button" class="md-primary" ng-click="qmgr.loadMore()">ดูเพิ่ม</md-button>
			    </div>

			</whiteframe>
		</md-content>

		<md-content class="md-padding" layout="row" ng-controller="QViewerCtrl as allq" >
			<md-whiteframe class="md-whiteframe-2dp" class="md-padding" flex="">
				<md-toolbar md-scroll-shrink ng-if="true">
					<div class="md-toolbar-tools">
						<h3>
							<span>ตรวจสอบคิว</span>
						</h3>
					</div>
				</md-toolbar>
				<div layout="column" class="md-inline-form inputdemoBasicUsage">
					<form class="form-inline">
						<div class="form-group">
							<md-input-container>
								<label>สาขา</label>
								<md-select ng-model="allq.branchId">
									<md-option ng-repeat="branch in allq.branches" value="{{branch.id}}">
										{{branch.code}} - {{branch.description}} </md-option>
								</md-select>
							</md-input-container>
						</div>
						<div class="form-group">
							<md-input-container> <label>สัปดาห์</label>
								<md-select ng-model="allq.weekId"" >
								<md-option ng-repeat="week in allq.weeks" ng-value="{{week.id}}"> {{week.weekText}} </md-option> 
								</md-select>
							</md-input-container>
						</div>
						<div class="form-group" id="find-div">
							<md-button id="search-button" class="md-raised md-primary" ng-click="allq.search($event)">ค้นหา</md-button>
						</div>
					</form>
					<div>
						<table ng-table="allq.tableParams"
							class="table table-condensed table-bordered table-striped table-hover">
							<tr style="font-size: 80%" " ng-repeat="row in $data">
								<td data-title="'เลขทะเบียนผู้ใช้น้ำ'" sortable="'accountNo'">
									{{row.accountNo}}</td>
								<td data-title="'เลขที่คำร้อง'"
									sortable="'petitionNo'">{{row.petitionNo}}</td>
								<td data-title="'วันที่รับคำร้อง'" 
									sortable="'petitionDate'">{{row.petitionDate}}</td>
							</tr>
						</table>
					</div>
				</div>
			</md-whiteframe>
		</md-content>
	</div>
</body>

</html>