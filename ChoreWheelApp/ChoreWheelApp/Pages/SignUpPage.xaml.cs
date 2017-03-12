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
    public partial class SignUpPage : ContentPage
    {
        public SignUpPage()
        {
            InitializeComponent();
        }
        private void OnSignUpButtonClicked()
        {
            messageLabel.Text = "Sign Up Succeeded!";
            App.IsLoggedIn = true;
            App.Current.MainPage = new NavigationPage(new MainPage());
        }
    }
}
