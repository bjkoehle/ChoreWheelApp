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
        public void OnLoginClicked()
        {
            //check DB for user
            if(true)//When there is a valid user
            {
                App.IsLoggedIn = true;
                App.Current.MainPage = new NavigationPage(new MainPage());
                //When logout is pressed
            }
            else
            {
                messageLabel.Text = "Login failed";
                passwordEntry.Text = string.Empty;
            }
        }
    }
}
