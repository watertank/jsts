import Geometry from './Geometry'
import GeometryCollection from './GeometryCollection'
import Polygonal from './Polygonal'
import ArrayList from '../../../../java/util/ArrayList'
export default class MultiPolygon extends GeometryCollection {
  constructor () {
    super()
    MultiPolygon.constructor_.apply(this, arguments)
  }

  equalsExact () {
    if (arguments.length === 2 && (typeof arguments[1] === 'number' && arguments[0] instanceof Geometry)) {
      const other = arguments[0]; const tolerance = arguments[1]
      if (!this.isEquivalentClass(other)) {
        return false
      }
      return super.equalsExact.call(this, other, tolerance)
    } else return super.equalsExact.apply(this, arguments)
  }

  getBoundaryDimension () {
    return 1
  }

  getTypeCode () {
    return Geometry.TYPECODE_MULTIPOLYGON
  }

  getDimension () {
    return 2
  }

  reverse () {
    const n = this._geometries.length
    const revGeoms = new Array(n).fill(null)
    for (let i = 0; i < this._geometries.length; i++) {
      revGeoms[i] = this._geometries[i].reverse()
    }
    return this.getFactory().createMultiPolygon(revGeoms)
  }

  getBoundary () {
    if (this.isEmpty()) {
      return this.getFactory().createMultiLineString()
    }
    const allRings = new ArrayList()
    for (let i = 0; i < this._geometries.length; i++) {
      const polygon = this._geometries[i]
      const rings = polygon.getBoundary()
      for (let j = 0; j < rings.getNumGeometries(); j++) {
        allRings.add(rings.getGeometryN(j))
      }
    }
    const allRingsArray = new Array(allRings.size()).fill(null)
    return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray))
  }

  getGeometryType () {
    return Geometry.TYPENAME_MULTIPOLYGON
  }

  copy () {
    const polygons = new Array(this._geometries.length).fill(null)
    for (let i = 0; i < polygons.length; i++) {
      polygons[i] = this._geometries[i].copy()
    }
    return new MultiPolygon(polygons, this._factory)
  }

  getClass () {
    return MultiPolygon
  }

  get interfaces_ () {
    return [Polygonal]
  }
}
MultiPolygon.constructor_ = function () {
  const polygons = arguments[0]; const factory = arguments[1]
  GeometryCollection.constructor_.call(this, polygons, factory)
}
MultiPolygon.serialVersionUID = -551033529766975875
