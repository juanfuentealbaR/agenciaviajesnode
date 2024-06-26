import { Testimonial } from '../models/Testimoniales.js';
import { Viaje } from '../models/Viaje.js';

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express responde

    // Consultar 3 viajes del modelo Viaje y 3 testimoniales
    const promiseDB = [];
    promiseDB.push( Viaje.findAll( {limit:3} ) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    try {
        const resultado = await Promise.all(promiseDB);

        const viajes = resultado[0];
        const testimoniales = resultado[1];

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }

}

const paginaNosotros = (req, res) => { 
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => { 

    // Consultar la BD
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => { 

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;
    
    try {
        const viaje = await Viaje.findOne({ where : { slug }});
        res.render('viaje', {
            pagina: 'Información viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}