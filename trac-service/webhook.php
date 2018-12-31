<?php
namespace TracRPC\Trello;

include_once (__DIR__. '/tracStatuses.php');

class WebHook
{
    protected $_storyID;
    
    function __construct($storyID) {
        $this->_storyID = $storyID;
    }

    /**
     * Update to story based on webhook detail
     */
    function UpdateStory($detail, $tracRPC)
    {
        // get trac statuses ready for use
        $statuses = StoryStatus::getTracStatuses();

        
        // Get the webhook detail
        $objDetail = json_decode($detail);      

        if($objDetail->model) {
            // We have the model.  Lets get the details.
            $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
            $txt = $this->_storyID . ": " . $detail;
            fwrite($myfile, $txt);
            fclose($myfile);
        }


    }    
}

?>