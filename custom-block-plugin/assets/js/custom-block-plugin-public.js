(function (wp, apiFetch) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;

    registerBlockType('custom-block-plugin/custom-block--public', {
        title: 'Custom Block Public',
        description: 'A custom block for WordPress',
        icon: 'smiley',
        category: 'common',

        attributes: {
            title: {
                type: 'string',
                source: 'html',
                selector: 'h2',
            },
            description: {
                type: 'string',
                source: 'html',
                selector: 'p',
            },
        },

        edit: function (props) {
            var descripcion_sitio = wp.data.select('core/editor').getEditedPostAttribute('excerpt.rendered');
            if (typeof descripcion_sitio === 'undefined') {
                descripcion_sitio = 'No hay descripción disponible.';
            }

            var post = wp.data.select('core/editor').getCurrentPost();
            var className = props.className;
            var categoryColors = {
                national: {
                    background: '#00B049',
                    text: '#FFFFFF',
                },
                entertainment: {
                    background: '#FFC915',
                    text: '#FFFFFF',
                },
                technology: {
                    background: '#00D3F8',
                    text: '#FFFFFF',
                },
                pets: {
                    background: '#90456D',
                    text: '#FFFFFF',
                },
                sports: {
                    background: '#FF372C',
                    text: '#FFFFFF',
                },
            };
            var categoryClass = '';

            if (post && post.categories && post.categories.length > 0) {
                var categoryId = post.categories[0];

                wp.apiFetch({
                        path: '/wp/v2/categories/' + categoryId
                    })
                    .then(function (category) {
                        var categoryName = category.name;
                        categoryName = categoryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        categoryName = categoryName.replace(/[0-9\s]/g, "");
                        categoryName = categoryName.toLowerCase()
                        categoryClass = 'custom-block-plugin-category';
                        switch (categoryName) {
                            case "nacional":
                                categoryClass += " national"
                                break;
                            case "entretenimiento":
                                categoryClass += " entertainment"
                                break;
                            case "tecnologia":
                                categoryClass += " technology"
                                break;
                            case "mascotas":
                                categoryClass += " pets"
                                break;
                            case "deportes":
                                categoryClass += " sports"
                                break;
                            default:
                                break;
                        }
                        let current_class = document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").getAttribute("class")
                        document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").setAttribute("class", `${current_class} ${categoryClass}`)
                    });
            } else {
                // Si no se selecciona ninguna categoría, se elimina cualquier clase de categoría existente
                let current_class = document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").getAttribute("class")
                document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").setAttribute("class", current_class.replace(/custom-block-plugin-category\S+/g, ""));
            }

            return el(
                'div', {
                    className: className + ' ' + categoryClass,
                },
                el(
                    'h2',
                    null,
                    post.title
                ),
                el(
                    'p',
                    null,
                    descripcion_sitio
                )
            );
        },

        save: function (props) {
            return el(
                'div', {
                    className: props.className,
                },
                el(
                    'h2',
                    null,
                    props.attributes.title
                ),
                el(
                    'p',
                    null,
                    props.attributes.description
                )
            );
        },
    }, {
        save: function (props) {
            return el(
                'div', {
                    className: props.className,
                },
                el(
                    'h2',
                    null,
                    props.attributes.title
                ),
                el(
                    'p',
                    null,
                    props.attributes.description
                )
            );
        },
    });

    window.onload = () => {
        if (document.body.contains(document.querySelector("#editor")) == false) {
            if (document.body.contains(document.querySelector(".wp-block-custom-block-plugin-custom-block--public"))) {

                let parent_element__custom_block = document.querySelector(".wp-block-custom-block-plugin-custom-block--public")
                let array_titulo_pagina = document.head.querySelector("title").textContent.split(" – ")
                var descripcion_sitio = wp.data.select('core/editor');
                if (typeof descripcion_sitio === 'undefined') {
                    descripcion_sitio = 'No hay descripción disponible.';
                }
                parent_element__custom_block.querySelector("h2").textContent = array_titulo_pagina[0];
                parent_element__custom_block.querySelector("p").textContent = descripcion_sitio;


                let categoryName = "";
                document.querySelectorAll(".cat-links a").forEach(element => {
                    categoryName = element.textContent
                    categoryName = categoryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    categoryName = categoryName.replace(/[0-9\s]/g, "");
                    categoryName = categoryName.toLowerCase()
                });
                categoryClass = 'custom-block-plugin-category';
                switch (categoryName) {
                    case "nacional":
                        categoryClass += " national"
                        break;
                    case "entretenimiento":
                        categoryClass += " entertainment"
                        break;
                    case "tecnologia":
                        categoryClass += " technology"
                        break;
                    case "mascotas":
                        categoryClass += " pets"
                        break;
                    case "deportes":
                        categoryClass += " sports"
                        break;
                    default:
                        break;
                }
                let current_class = document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").getAttribute("class")
                document.querySelector(".wp-block-custom-block-plugin-custom-block--public ").setAttribute("class", `${current_class} ${categoryClass}`)
            }
        }
    }


})(window.wp, window.wp.apiFetch);