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
    public partial class SettingsPage : ContentPage
    {
        public SettingsPage()
        {
            InitializeComponent();
        }
        async void OnProfileClicked(object sender, EventArgs e)
        {
            var a = new UserProfilePage();
            NavigationPage.SetHasNavigationBar(a, false);
            await Navigation.PushAsync(a);
        }
    }
}
