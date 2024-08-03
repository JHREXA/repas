import { Component, ElementRef, Input, OnInit, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LatLng, LatLngLiteral, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map as leafletMap, tileLayer, marker as leafletMarker } from 'leaflet';
import { Order } from '../../../shared/models/Order';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input()
  order!: Order;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON_URL = "./assets/marker.png"
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  currentMarker?: Marker;
  isBrowser: boolean;

  constructor(private locationService: LocationService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initializeMap();
    }
  }

  async initializeMap() {
    if (this.map) return;

    // Import Leaflet dynamically and destructure required functions
    const { map, tileLayer, marker, icon } = await import('leaflet');

    // Initialize the map
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    // Add tile layer
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    // Set up click event listener to add markers
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    });
  }

  async findMyLocation() {
    if (!this.isBrowser) return;

    this.locationService.getCurrentLocation().subscribe({
      next: async (latlng: LatLngLiteral) => {
        const leaflet = await import('leaflet');
        this.map.setView([latlng.lat, latlng.lng], this.MARKER_ZOOM_LEVEL); // Convert LatLngLiteral to LatLngTuple
        this.setMarker(latlng);
      }
    });
  }

  async setMarker(latlng: LatLngLiteral | LatLngTuple) {
    if (!this.order) {
      console.error('Order is undefined');
      return;
    }

    // Import Leaflet dynamically and destructure required functions
    const { marker, icon } = await import('leaflet');

    // Convert LatLngLiteral to LatLngTuple if necessary
    const leafletLatLng: LatLngTuple = Array.isArray(latlng)
      ? latlng
      : [latlng.lat, latlng.lng] as LatLngTuple;

    // Check if the current marker exists, and update its position
    if (this.currentMarker) {
      this.currentMarker.setLatLng(leafletLatLng);
      return;
    }

    // Create a new marker and add it to the map
    this.currentMarker = marker(leafletLatLng, {
      draggable: true,
      icon: icon({
        iconUrl: this.MARKER_ICON_URL,
        iconSize: [42, 42], // Adjust size as necessary
        iconAnchor: [21, 42], // Adjust anchor as necessary
      })
    }).addTo(this.map);

    // Update the addressLatLng when the marker is dragged
    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker!.getLatLng(); // Ensure currentMarker is defined
    });
  }

  set addressLatLng(latlng: LatLng) {
    if (!this.order) {
      console.error('Order is undefined');
      return;
    }

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }
}
