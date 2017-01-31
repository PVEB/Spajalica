/**
 * Created by djnenadovic on 31.1.2017..
 */

angular.module("SpajalicaFrontEnd").service('Constants', function () {

    //BE url
    this.urlBE = "http://localhost:8000/";

    //pages urls
    this.SettingsPageUrl = 'pages/SettingsPage.html';
    this.ProfilePageUrl = 'pages/ProfilePage.html';
    this.SearchPageUrl = 'pages/SearchPage.html';
    this.NewsPageUrl = 'pages/NewsPage.html';
    this.MessagesPageUrl = 'pages/MessagesPage.html';
    this.MatchPageUrl = 'pages/MatchPage.html';
    this.LoginPage = './Login.html';
    this.IndexPage = './index.html';

    //funkcija za prebacivanje datuma
    //u prigodan format za mysql
    this.formatDate = function(date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('-');
    };

});
