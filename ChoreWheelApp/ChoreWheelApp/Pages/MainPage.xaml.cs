using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace ChoreWheelApp.Pages
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }
        async void OnSettingsClicked(object sender, EventArgs e)
        {
            var sPage = new SettingsPage();
            NavigationPage.SetHasNavigationBar(sPage, false);
            await Navigation.PushAsync(sPage);
        }
        async void OnChoreListClicked(object sender, EventArgs e)
        {
            var clPage = new ChoreListPage();
            NavigationPage.SetHasNavigationBar(clPage, false);
            await Navigation.PushAsync(clPage);
        }
        async void OnMyTasksClicked(object sender, EventArgs e)
        {
            var myTaskPage = new MyTasksPage();
            NavigationPage.SetHasNavigationBar(myTaskPage, false);
            await Navigation.PushAsync(myTaskPage);
        }
    }
}
