using System;

using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using Android.Content;

namespace ChoreWheelApp.Droid
{
	[Activity (Label = "ChoreWheelApp", Icon = "@drawable/icon", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
	public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsApplicationActivity
	{
		protected override void OnCreate (Bundle bundle)
		{
			base.OnCreate (bundle);
            SetContentView(Resource.Layout.FrontPage);
            Button button = FindViewById<Button>(Resource.Id.start);
            button.Click += delegate
            {
                var secondActivity = new Intent(this, typeof(UserProfilePage));
                StartActivity(secondActivity);
            };
            global::Xamarin.Forms.Forms.Init (this, bundle);
			LoadApplication (new ChoreWheelApp.App ());
		}
	}
}

