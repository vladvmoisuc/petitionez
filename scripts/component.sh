root="$(pwd)"

echo "$root"

read -p "Enter the name of the component (use camelCase): " component

PascalCase="$(echo "${component:0:1}" | tr '[a-z]' '[A-Z]')${component:1}"

echo "The name of the component will be $PascalCase, the folder and file will be called $component."

read -p "Do you want a stylesheet? (y)" hasStylesheet

mkdir app/components/$component

if [ "$hasStylesheet" = "y" ]; then 
  sed "s/component/$component/g" $root/app/templates/styledComponent/index.tsx > app/components/$component/index.tsx

  sed "s/Component/$PascalCase/g"  $root/app/templates/styledComponent/component.tsx > app/components/$component/$component.tsx

  touch app/components/$component/style.css
else
  sed "s/component/$component/g" $root/app/templates/component/index.tsx  > app/components/$component/index.tsx

  sed "s/Component/$PascalCase/g"  $root/app/templates/component/component.tsx > app/components/$component/$component.tsx
fi

echo All good! Love ya ♡
