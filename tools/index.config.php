<?php
//这个文件可以重定义，用来修改config

//开头要有'/'，结束不能有'/'，从 index.php 所在路径相对计算
api_g("path-apis",[
    //['apis'=>['hello','world'],'path'=>'/../../api-bak']
  ]);

api_g('-cfg file--',__FILE__);
