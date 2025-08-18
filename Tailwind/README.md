+ utility first approach
General
+ still using classes but composing styles directly with uc
+ tw classes are predefined CSS rules e.g. 'flex' transforms to '.flex { display: flex}'
+ allows u to use more advanced props like pseudo-classes and media queries
+ classes are completely reusable

Size
+ the total of 3566KB load will reduced due to purging while deploying, using only necessary comps/classes

Responsiveness
+ unprefixed utilities take effect on all screen sizes, prefixed like 'md:uppercase' only take effect at the specified breakpoint (and above) >> mobile first approach
+ BUT: don't use 'sm' to taget mobile devices but unprefixed ('sm' like 'small breakpoint', not 'small device')
+ as an example: <div class="text-center sm:text-left"> will center text on mobile and left align it on screens wider than 640px)
+ breakpoints are fully customizable with '--breakpoint-*' > see @theme after @import

Darkmode
+ darkmode in tw/css: prefix-keyword 'dark:' (based on OS or Browser)
+ there are different ways to activate DarkMode: manually via dark pr using the data-attribute
