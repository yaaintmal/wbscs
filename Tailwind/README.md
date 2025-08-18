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

Custom Styles
+ colors-values can also be utilized and applied inline using brackets like 'text-[#cc0000]' or 'bg-[#333333]'
+ customizing works not only with colors, but every html-element like 'p-[16px]'
>> Better practise: adjust config using tailwindcss-directives ('@import', '@theme', '@source', '@utility' etc)

Tipps & Tricks
+ default accent colors can be adjusted by creating accent-classes
+ tw can create fluid responsiveness, e.g. 'class="text-[min(10vw,70px)]"
+ Highlighting use selection e.g. with colors
+ reduce JS-Conditions for styling, e.g. using 'details' with an 'open' prefix
+ even the cursor can be adjusted, using 'caret'
+ more possibilities: 'before' & 'active', styles to work only on certain screen sizes like landscape or portrait, styles for ARIA and screenreader, gradients animations, apply distinc styles when printing


