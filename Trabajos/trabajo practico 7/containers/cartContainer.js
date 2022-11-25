const fs = require("fs");

class contenedorCarrito {
	constructor() {
		this.archivo = "./dataBases/productsCart.json";
	}

	getAll = async () => {
		try {
			const archivo = await fs.promises.readFile(this.archivo);
			const productos = JSON.parse(archivo);
			return productos;
		} catch (e) {
			console.log(e);
		}
	};

	save = async (producto) => {
		try {
			const productos = await this.getAll();
			productos.push(producto);
			fs.promises.writeFile(this.archivo, JSON.stringify(productos, null));
		} catch (e) {
			console.log(e);
		}
	};

	getById = async (id) => {
		try {
			const dataRecuperada = await this.getAll();
			const dataNueva = dataRecuperada.find((data) => data.id == id);
			return dataNueva;
		} catch (e) {
			console.log(e);
		}
	};

	async deleteById(id) {
		try {
			const productos = await this.getAll();
			const productoEncontrado = productos.find((e) => e.id == id);
			if (!productoEncontrado) return console.log("el id no existe");
			const productosFiltrados = productos.filter((e) => e.id != id);
			fs.promises.writeFile(
				this.archivo,
				JSON.stringify(productosFiltrados, null)
			);
			console.log("producto borrado");
		} catch (e) {
			console.log(e);
		}
	}

	deleteAll = async () => {
		try {
			await fs.promises.writeFile(this.archivo, JSON.stringify([], null));
			console.log("se borraron todos los productos");
		} catch (e) {
			console.log(e);
		}
	};

	updateById = async (id, title, price, thumbnail) => {
		try {
			const productos = await this.getAll();
			const item = productos.find((prod) => prod.id == id);
			if (item) {
				item.title = title;
				item.price = price;
				item.thumbnail = thumbnail;
				console.log(item);
				await fs.promises.writeFile(
					this.archivo,
					JSON.stringify(productos, null, 2)
				);
				return item;
			} else {
				return { error: "Producto no encontrado" };
			}
		} catch (error) {
			console.log(error);
		}
	};
}

const contenedor = new contenedorCarrito();

module.exports = contenedorCarrito;
