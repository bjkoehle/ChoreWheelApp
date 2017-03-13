using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace ChoreWheelApp.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Login : ContentPage
    {
        public Login()
        {
            InitializeComponent();
        }
        public void OnLoginClicked(object sender, EventArgs e)
        {
            //check DB for user
            if(true)//When there is a valid user
            {
                App.IsLoggedIn = true;
                var mPage = new MainPage();
                NavigationPage.SetHasNavigationBar(mPage, false);
                App.Current.MainPage = new NavigationPage(mPage);
                //When logout is pressed
            }
            else
            {
                messageLabel.Text = "Login failed";
                passwordEntry.Text = string.Empty;
            }
        }
        async void OnSignUpButtonClicked(object sender, EventArgs e)
        {
            var sUpPage = new SignUpPage();
            NavigationPage.SetHasNavigationBar(sUpPage, false);
            await Navigation.PushAsync(sUpPage);
        }
    }
}
