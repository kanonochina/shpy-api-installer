


<?php if (is_page('4122')): ?>

<script type>
console.log('<?php $key="IFS_split"; echo get_post_meta($post->ID, $key, true); ?>');
</script>

<?php 
$key="IFS_split";
$splitval=get_post_meta($post->ID, $key, true);

if ($splitval == "A") {
    update_post_meta( $post->ID, $key, 'B' );
} elseif ($splitval == "B")  {
    update_post_meta( $post->ID, $key, 'C' );
} elseif ($splitval == "C")  {
    update_post_meta( $post->ID, $key, 'D' );
} elseif ($splitval == "D")  {
    update_post_meta( $post->ID, $key, 'A' );
}
 ?>
<?php endif; ?>


<?php

$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->addForm(array(  
  'inf_form_xid' => '8d597ebcc531e6055424fbee813563c2',
  'inf_form_name' => 'Web Form submitted',
  'infusionsoft_version' => '1.68.0.168',
  'inf_field_FirstName' => 'Markos',
  'inf_field_Email' => 'kanonochina@gmail.com',
  'inf_custom_splitTest' => 'q',
  'inf_custom_Waist' => 'h',
  'inf_custom_Bicep' => 'h',
  'inf_custom_Chest' => 'j',
  'inf_custom_Thigh' => 'jk',
  'inf_custom_Calf' => 'k',
  'inf_custom_WeightMeasurement' => 'h',
  'inf_custom_Howexhausteddoyoufeelaftereachsession' => 'k',
  'inf_custom_Howharddoyoufeelyouareexertingyourselfineachtraining' => 'h',
  'inf_custom_Howmuchdoyoulookforwardtoeachtrainingsession' => 'j',
  'inf_custom_Doyouhaveanyinjuries' => 'g',
  'inf_custom_Howsoreareyouaftereachsession' => 'hy',
  'inf_custom_Othernotes' => 'j',
  'inf_custom_Howwellareyousleepingatnight' => 'n',
  'inf_custom_Doyoufeeltheneedtonapduringtheday' => 'gh',
  'inf_custom_Whattimedoyougotosleep' => 'j',
  'inf_custom_Whattimedoyouwake' => 'n',
  'inf_custom_Doyouhavevividdreams' => 'g',
  'inf_custom_Doyoufeelyouneedtosleepmore' => 'j',
  'inf_custom_Doyoufeelsleepybutcantsleep' => 'mn',
  'inf_custom_Howisyourdigestion' => 'k',
  'inf_custom_Doyoudigestcarbswell' => 'j',
  'inf_custom_Doyoudigestfatswell' => 'gh',
  'inf_custom_Doyoudigestproteinwell' => 'vg',
  'inf_custom_Othernotes0' => 'h'
), NULL);

$request->setRequestUrl('https://hw410.infusionsoft.com/app/form/process/8d597ebcc531e6055424fbee813563c2');
$request->setRequestMethod('POST');
$request->setBody($body);

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();?>

