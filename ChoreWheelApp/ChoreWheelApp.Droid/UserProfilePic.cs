using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;

namespace ChoreWheelApp.Droid
{
    [Activity(Label = "UserProfilePic")]
    public class UserProfilePic : Activity
    {
        public static readonly int PickImageId = 1000;
        private ImageView _imageView;
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.UserProfileEdit);
            _imageView = FindViewById<ImageView>(Resource.Id.userProfilePic);
            Button button = FindViewById<Button>(Resource.Id.picBtn);
            button.Click += ButtonOnClick;
            // Create your application here
        }

        protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
        {
            if ((requestCode == PickImageId) && (resultCode == Result.Ok) && (data != null))
            {
                Android.Net.Uri uri = data.Data;
                _imageView.SetImageURI(uri);
            }
        }

        private void ButtonOnClick(object sender, EventArgs e)
        {
            Intent = new Intent();
            Intent.SetType("image/*");
            Intent.SetAction(Intent.ActionGetContent);
            StartActivityForResult(Intent.CreateChooser(Intent, "Select Picture"), PickImageId);
        }
    }
}