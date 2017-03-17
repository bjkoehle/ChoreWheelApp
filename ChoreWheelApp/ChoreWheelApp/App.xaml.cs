using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace ChoreWheelApp
{
    public partial class App : Application
    {
        public static bool IsLoggedIn { get; set; }

        public App()
        {
            InitializeComponent();
            if (!IsLoggedIn)
            {
                var loginPage = new Pages.Login();
                NavigationPage.SetHasNavigationBar(loginPage, false);
                MainPage = new NavigationPage(loginPage);
                
            }
            else{
                var mPage = new ChoreWheelApp.Pages.MainPage();
                NavigationPage.SetHasNavigationBar(mPage, false);
                MainPage = new NavigationPage(mPage);
            }
            
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
